links=(
  "https://janarthanan.surveysparrow.com/api/internal/surveys/1000086991/questions/1001062223/clone"
  "https://janarthanan.surveysparrow.com/api/internal/surveys/1000086991/questions/1001062224/clone"
  "https://janarthanan.surveysparrow.com/api/internal/surveys/1000086991/questions/1001062225/clone"
  "https://janarthanan.surveysparrow.com/api/internal/surveys/1000086991/questions/1001062226/clone"
  "https://janarthanan.surveysparrow.com/api/internal/surveys/1000086991/questions/1001062227/clone"
  "https://janarthanan.surveysparrow.com/api/internal/surveys/1000086991/questions/1001062228/clone"

)


for i in {1..20}; do
  for link in "${links[@]}"; do
      open -a "Google Chrome" "$link"
      sleep 1 
  done
done

