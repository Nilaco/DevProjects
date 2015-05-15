class User < ActiveRecord::Base
  validates :email, uniqueness: true
  validates :email, presence: true
  validates :password, presence: true
  # Remember to create a migration!

  has_many :searches
end
