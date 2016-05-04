require 'csv'
class Researcher < ActiveRecord::Base
  mount_uploader :avatar, AvatarUploader
  acts_as_messageable
  acts_as_mentionable
  acts_as_liker
  acts_as_followable
  acts_as_follower
  belongs_to :users
  belongs_to :researchers
  belongs_to :trip_pass
  has_many :researches, dependent: :destroy
  before_save :name
  validates_presence_of :first_name, :last_name
  # before_create :gen_name_hash
  # after_validation :gen_name_hash, :if => :name_hash_changed?
  geocoded_by :current_location
  after_validation :geocode, :if => :current_location_changed?


  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :discipline, :phone_number, :name_hash, :name, :first_name, :last_name, :email, :password, :bio, :title, :headline, :current_location, :avatar, :avatar_cache, :remove_avatar, :password_confirmation

  # def gen_name_hash
  #   self.update_attribute(:name_hash, Digest::MD5.hexdigest(self.name))
  # end

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      researcher = find_by_id(row["id"]) || new
      researcher.attributes = row.to_hash.slice(*accessible_attributes)
      inDatabase = Researcher.all.map{|u| u.email}.include? researcher.email
      if researcher.encrypted_password.blank? && !researcher.email.blank? && !inDatabase
        researcher.invite!
      else
        researcher.save!
      end
  end


  def self.to_csv(options = {})
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |researcher|
        csv << researcher.attributes.values_at(*column_names)
      end
    end
  end

  def name
    if self.first_name.nil?
      self.first_name = ""
    end
    if self.last_name.nil?
      self.last_name = ""
    end
    self.name = self.first_name + " " +  self.last_name
  end

  def has_new_requests?
    new_requests = TripPass.where(researcher: self).where(researcher_accept: false).where(researcher_declined: false)
    if new_requests.blank?
      return false
    else
      return true
    end
  end

  def mailboxer_email(object)
    return self.email
  end

end
