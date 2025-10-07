class AddThemePreferenceToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :theme_preference, :string, default: 'light'
  end
end