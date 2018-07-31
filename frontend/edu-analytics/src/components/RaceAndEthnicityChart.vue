
<script>
import { Bar, Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  props: {
      chartData: {
        type: Array | Object,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
  
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Race And Ethnicity',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'orange',
            data: this.chartData
          }
        ]
      }, this.options)
    },
  methods: {
	updateRaceAndEthnicityData() {
		this.$data._chart.update();
	}
}
}
</script>

