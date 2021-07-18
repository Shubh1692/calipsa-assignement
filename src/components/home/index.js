import Datepicker from "vue3-datepicker";
import axios from "axios";
import TableLite from "vue3-table-lite";
import { reactive } from "vue";
export default {
  name: "Home",
  components: {
    Datepicker,
    TableLite
  },
  props: {

  },
  data() {
    return {
      filter: {
        offset: 1,
        limit: 10,
        startDate: "",
        endDate: "",
        hasOutcome: undefined
      },
      table: reactive({
        isLoading: false,
        isReSearch: false,
        columns: [
          {
            label: "Location",
            field: "location"
          },
          {
            label: "Time",
            field: "timestamp"
          },
          {
            label: "OutCome",
            field: "outcome"
          }
        ],
        rows: [],
        totalRecordCount: 0,
        messages: {
          pagingInfo: "Showing {0}-{1} of {2}",
          pageSizeChangeLabel: "Row count:",
          gotoPageLabel: "Go to page:",
          noDataAvailable: "No data",
        },
      })
    }
  },
  methods: {
    async search(offset = 1, limit = 10) {
      this.filter.offset = offset;
      this.filter.limit = limit
      try {
        if (this.validation()) {
          this.table.isLoading = true;
          const { data: {
            data: {
              total,
              alarms
            }
          }} = await axios({
            method: "POST",
            url: `http://localhost:8001/api/data/`,
            data: this.filter,
          });
          this.table.isLoading = false;
          this.table.totalRecordCount = total;
          this.table.rows = alarms;
        }
      } catch (error) {
        alert(error);
        this.table.isLoading = false;
        this.table.totalRecordCount = 0;
        this.table.rows = [];
      }
    },
    validation() {
      if (this.filter.startDate && this.filter.endDate && this.filter.startDate > this.filter.endDate) {
        alert('Start date should be less than or equal End date');
        return false;
      }
      return true;
    }
  },
  beforeMount(){
    this.search();
 },
};