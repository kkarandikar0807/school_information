
<script>
import { Bar, Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
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
            label: 'Net Price Private Income',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'blue',
            data: this.chartData
          }
        ]
      }, this.options)
    },
  methods: {
	updatePrivateIncomeData() {
		this.$data._chart.update();
	}
}
}
</script>

