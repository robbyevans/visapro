class CreateDocuments < ActiveRecord::Migration[7.2]
  def change
    create_table :documents do |t|
      t.references :application, null: false, foreign_key: true
      t.integer :doc_type
      t.string :file_url

      t.timestamps
    end
  end
end
