class AddIndexToUsersCountryCode < ActiveRecord::Migration[7.2]
  def change
    add_index :users, :country_code
  end
end