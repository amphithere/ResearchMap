class MessagesController < ApplicationController
  before_action :authenticate!
  before_action :get_user

  def new

  end

  def create
    recipients = User.where(email: params['recipients']) + Researcher.where(email: params['recipients'])
    conversation = @current.send_message(recipients, params[:message][:body], params[:message][:subject]).conversation
    flash[:success] = "Message has been sent!"
    redirect_to conversation_path(conversation)
  end

  def modal_send(body, recipient)
    recipients = User.where(email: recipient) + Researcher.where(email: recipient)
    modal_conversation = @current.send_message(recipients, body, "Regarding your recent Trip Request with #{@current.name}")
    flash[:success] = 'Message sent!'
  end

  private
  def get_user
    if researcher_signed_in?
      @current = current_researcher
    else
      @current = current_user
    end
  end

end
