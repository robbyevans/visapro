class Document < ApplicationRecord
  belongs_to :application

  enum doc_type: { passport: 0, invitation_letter: 1 }

end
