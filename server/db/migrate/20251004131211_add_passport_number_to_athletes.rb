class AddPassportNumberToAthletes < ActiveRecord::Migration[7.2]
  def change
    add_column :athletes, :passport_number, :string
  end
end
