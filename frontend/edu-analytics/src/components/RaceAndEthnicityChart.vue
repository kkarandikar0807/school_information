
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
            backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                              '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                              '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                              '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A'],
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

