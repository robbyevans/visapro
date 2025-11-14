class InvoicesController < ApplicationController
  before_action :set_invoice, only: [:show, :update_status]
  before_action :authorize_admin_or_owner!, only: [:show]

  # ----------------------------------------------------------
  # GET /invoices
  # ----------------------------------------------------------
  def index
    invoices = if current_user.admin?
                 Invoice.includes(:user, applications: :athlete).order(created_at: :desc)
               else
                 current_user.invoices.includes(applications: :athlete).order(created_at: :desc)
               end

    render_invoice(invoices)
  end

  # ----------------------------------------------------------
  # GET /invoices/:id
  # ----------------------------------------------------------
  def show
    render_invoice(@invoice)
  end

  # ----------------------------------------------------------
  # POST /invoices
  # ----------------------------------------------------------
  def create
    apps_payload = invoice_params[:applications]

    if apps_payload.blank?
      return render json: { error: "No applications provided" }, status: :unprocessable_entity
    end

    application_ids = apps_payload.map { |a| a[:id] }
    apps = Application.where(id: application_ids)

    # Authorization
    if !current_user.admin?
      if apps.any? { |a| a.user_id != current_user.id }
        return render json: { error: "You can only invoice your own applications" }, status: :forbidden
      end
    end

    # Prevent double invoicing
    already_invoiced = apps.where.not(invoice_id: nil)
    if already_invoiced.any?
      return render json: { error: "Some applications already have an invoice" }, status: :unprocessable_entity
    end

    invoice = nil

    Invoice.transaction do
      # Create invoice shell
      invoice = current_user.invoices.create!(
        invoice_number: SecureRandom.hex(5).upcase,
        issue_date: Date.today,
        due_date: Date.today + 14.days,
        notes: invoice_params[:notes],
        total_amount: 0
      )

      # Update per-application pricing
      apps_payload.each do |app_hash|
        app_record = Application.find(app_hash[:id])

        app_record.update!(
          unit_price: app_hash[:unit_price],
          invoice_id: invoice.id,
          status: :invoiced
        )
      end

      # Recalculate total amount
      invoice.update!(total_amount: invoice.applications.sum(:unit_price))
    end

    render_invoice(invoice)
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  # ----------------------------------------------------------
  # PATCH /invoices/:id/update_status
  # ----------------------------------------------------------
  def update_status
    unless Invoice.statuses.keys.include?(params[:status])
      return render json: { error: "Invalid status" }, status: :unprocessable_entity
    end

    @invoice.update!(status: params[:status])
    render_invoice(@invoice)
  end

  private

  def set_invoice
    @invoice = Invoice.includes(:applications).find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Invoice not found" }, status: :not_found
  end

  def authorize_admin_or_owner!
    unless current_user.admin? || @invoice.user_id == current_user.id
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end

  # Strong params
  def invoice_params
    params.require(:invoice).permit(
      :notes,
      applications: [:id, :unit_price]
    )
  end

  def render_invoice(invoice)
    render json: invoice.as_json(
      include: {
        user: { only: [:id, :name, :email] },
        applications: {
          only: [:id, :country, :status, :remarks, :unit_price, :created_at, :invoice_id],
          include: {
            athlete: {
              only: [:first_name, :last_name, :passport_number]
            }
          }
        }
      }
    )
  end

end  
