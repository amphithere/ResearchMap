class ResearchesController < ApplicationController
  before_filter :set_research, only: [:show, :edit, :update, :destroy]

  # GET /researches
  # GET /researches.json
  def index
    # Fix the sorting issue after searching
    @researches = Research.all
    @q = Research.ransack(params[:q])
    @researches = @q.result
    if user_signed_in? && current_user.admin?
      respond_to do |format|
        format.html
        format.csv { send_data @researches.to_csv }
        format.xls
      end
    end
  end

  def search
    redirect_to search_path and return
  end

  # GET /researches/1
  # GET /researches/1.json
  def show
    @research = Research.find(params[:id])
    if user_signed_in?
      @current = current_user
    elsif researcher_signed_in?
      @current = current_researcher
    else
    end
    respond_to do |format|
      format.html
      format.json {render json: @research}
    end
  end

  # GET /researches/new
  def new
    if researcher_signed_in? or current_user.try(:admin?)
      @research = Research.new
    else
      redirect_to :back, alert: "You are not authorized to create a new research"
    end
  end

  # GET /researches/1/edit
  def edit
    if researcher_signed_in? and @research.researcher == current_researcher
    elsif current_user.try(:admin?)
    else
      redirect_to :back, alert: "You are not authorized to edit this Research"
    end
  end

  # POST /researches
  # POST /researches.json
  def create
    @research = Research.new(research_params)
    if current_user.try(:admin?)
      @research.researcher_id = params['researcher']
    else
      @research.researcher = current_researcher
    end
    respond_to do |format|
      if @research.save
        @research.create_activity :create, owner: current_researcher
        format.html { redirect_to @research, notice: 'Research was successfully created.' }
        format.json { render :show, status: :created, location: @research }
      else
        format.html { render :new }
        format.json { render json: @research.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /researches/1
  # PATCH/PUT /researches/1.json
  def update
    if current_user.try(:admin?)
      @research.researcher_id = params['researcher']
    else
      @research.researcher = current_researcher
    end
    respond_to do |format|
      if @research.update(research_params)
        format.html { redirect_to @research, notice: 'Research was successfully updated.' }
        format.json { render :show, status: :ok, location: @research }
      else
        format.html { render :edit }
        format.json { render json: @research.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /researches/1
  # DELETE /researches/1.json
  def destroy
    @research.destroy
    # @research.create_activity :destroy, owner: current_researcher
    respond_to do |format|
      format.html { redirect_to researches_url, notice: 'Research was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def import
    if user_signed_in? && current_user.admin?
      Research.import(params[:file])
      redirect_to :back, notice: "Research created/edited."
    else
      redirect_to :back
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_research
      @research = Research.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def research_params
      params.require(:research).permit(:keywords, :name, :unknown, :location, :abstract, :dateStart, :dateEnd, :available, :weekStart, :weekEnd, :inFieldStart, :inFieldEnd, :headline, :latitude, :longitude, :researcher, :researcher_id)
    end
end
