class CreateInvoices < ActiveRecord::Migration[7.2]
  def change
    create_table :invoices do |t|
      t.bigint :user_id, null: false
      t.string :invoice_number, null: false
      t.decimal :total_amount, precision: 10, scale: 2, null: false
      t.date :issue_date, null: false
      t.date :due_date
      t.integer :status, default: 0, null: false
      t.text :notes
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index [:invoice_number], name: "index_invoices_on_invoice_number", unique: true
      t.index [:user_id], name: "index_invoices_on_user_id"
      t.index [:status], name: "index_invoices_on_status"
    end

    create_table :invoice_applications do |t|
      t.bigint :invoice_id, null: false
      t.bigint :application_id, null: false
      t.decimal :unit_price, precision: 10, scale: 2, null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
      t.index [:application_id], name: "index_invoice_applications_on_application_id"
      t.index [:invoice_id, :application_id], name: "index_invoice_applications_on_invoice_and_application", unique: true
      t.index [:invoice_id], name: "index_invoice_applications_on_invoice_id"
    end

    add_foreign_key :invoices, :users
    add_foreign_key :invoice_applications, :invoices
    add_foreign_key :invoice_applications, :applications
  end
end
