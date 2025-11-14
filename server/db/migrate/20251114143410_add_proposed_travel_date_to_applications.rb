class AddProposedTravelDateToApplications < ActiveRecord::Migration[7.0]
  def change
    add_column :applications, :proposed_travel_date, :date
  end
end
