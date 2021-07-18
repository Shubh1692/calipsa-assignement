<template>
  <div class="home">
    <div class="row">
      <div class="col">
        <label>Start Date: </label>
        <datepicker v-model="filter.startDate" />
      </div>
      <div class="col">
        <label>End Date: </label>
        <datepicker v-model="filter.endDate" />
      </div>
      <div class="col">
        <label>Outcome: </label>
        <select v-model="filter.hasOutcome">
          <option v-bind:value="undefined">
            Both
          </option>
          <option v-bind:value="true">
            True
          </option>
          <option v-bind:value="false">
            False
          </option>
        </select>
      </div>
      <div class="col">
        <label>&nbsp;</label>
        <button v-bind:disabled="table.isLoading" v-on:click="search(filter.page, filter.limit)">Submit</button>
      </div>
    </div>
    <div class="row">
      <table-lite
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :messages="table.messages"
        @is-finished="tableLoadingFinish"
        @do-search="search"
      ></table-lite>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./index.css"></style>
