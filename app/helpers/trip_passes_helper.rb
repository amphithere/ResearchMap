module TripPassesHelper
  def researcher_options
    s = ''
    Researcher.all.each do |researcher|
      s << "<option value='#{researcher.id}'>#{researcher.first_name} #{researcher.last_name}</option>"
    end
    s.html_safe
  end
  def research_options
    s = ''
    Research.where(available: true).each do |research|
      s << "<option value='#{research.id}'>#{research.name} in #{research.location} (#{research.researcher.name})</option>"
    end
    s.html_safe
  end
end
