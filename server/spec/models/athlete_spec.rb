require 'rails_helper'

RSpec.describe Athlete, type: :model do
  subject { create(:athlete)}

  it { should belong_to(:user) }
  it { should have_many(:applications).dependent(:destroy) }
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:passport_number) }
  it { should validate_uniqueness_of(:passport_number).case_insensitive }
end
