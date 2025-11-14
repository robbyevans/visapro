class AddContactFieldsToAthletes < ActiveRecord::Migration[7.0]
  def change
    add_column :athletes, :phone_number, :string
    add_column :athletes, :email, :string
  end
end
