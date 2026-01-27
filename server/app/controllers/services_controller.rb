class ServicesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]
  
  def index
    services = Service.all
    render json: services
  end

  def show
    service = Service.find(params[:id])
    render json: service
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Service not found' }, status: :not_found
  end

  def create
    service = Service.new(service_params)
    
    if service.save
      render json: service, status: :created
    else
      render json: { errors: service.errors }, status: :unprocessable_entity
    end
  end

  private

  def service_params
    params.require(:service).permit(:name, :description)
  end
end