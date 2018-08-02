
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
            backgroundColor: ['red', 'blue', 'orange', 'orangered', '	#DEB887', '	#FFF8DC', '	#DC143C', '	#BDB76B', '	#8B008B', '	#E9967A', '#1E90FF', '#1E90FF', 
                    '	#FFD700', '	#ADFF2F', '	#008000', '	#ADD8E6', '	#90EE90', '	#87CEFA', '	#00FF00'],
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

