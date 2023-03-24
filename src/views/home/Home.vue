<template>
  <div class="admin-dashboard">
    <!-- 主体内容区域 -->
    <div class="admin-container">
      <div class="dashboard">
        <div class="dashboard-item">
          <div class="dashboard-item-header">
            <i class="el-icon-data-line" />
            <span class="dashboard-item-title">总答案数</span>
          </div>
          <div class="dashboard-item-content">
            <el-progress :percentage="70" color="#13ce66" text-inside />
            <div class="dashboard-item-info">
              <span class="dashboard-item-number">2,000,000</span>
              <span class="dashboard-item-change">+4.5%</span>
            </div>
          </div>
        </div>
        <div class="dashboard-item">
          <div class="dashboard-item-header">
            <i class="el-icon-edit" />
            <span class="dashboard-item-title">总答题数</span>
          </div>
          <div class="dashboard-item-content">
            <el-progress :percentage="60" color="#20a0ff" text-inside />
            <div class="dashboard-item-info">
              <span class="dashboard-item-number">500,000</span>
              <span class="dashboard-item-change">+3.2%</span>
            </div>
          </div>
        </div>
        <div class="dashboard-item">
          <div class="dashboard-item-header">
            <i class="el-icon-s-data" />
            <span class="dashboard-item-title">总分数</span>
          </div>
          <div class="dashboard-item-content">
            <el-progress :percentage="80" color="#f7ba2a" text-inside />
            <div class="dashboard-item-info">
              <span class="dashboard-item-number">8,000,000</span>
              <span class="dashboard-item-change">+6.7%</span>
            </div>
          </div>
        </div>
        <div class="dashboard-item">
          <div class="dashboard-item-header">
            <i class="el-icon-date" />
            <span class="dashboard-item-title">今日答题</span>
          </div>
          <div class="dashboard-item-content">
            <div class="dashboard-item-today">
              <div class="dashboard-item-today-number">2,500</div>
              <div class="dashboard-item-today-change">+10.5%</div>
            </div>
            <div class="dashboard-item-today-chart">
              <line-chart :data="todayData" :options="todayOptions" />
            </div>
          </div>
        </div>
      </div>
      <el-progress :percentage="50" />
      <el-progress :percentage="100" :format="format" />
      <el-progress :percentage="100" status="success" />
      <el-progress :percentage="100" status="warning" />
      <el-progress :percentage="50" status="exception" />
      <el-progress type="circle" :percentage="0" />
      <el-progress type="circle" :percentage="25" />
      <el-progress type="circle" :percentage="100" status="success" />
      <el-progress type="circle" :percentage="70" status="warning" />
      <el-progress type="circle" :percentage="50" status="exception" />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      todayData: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
        datasets: [
          {
            label: '答题量',
            data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
            borderColor: '#20a0ff',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      todayOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        }
      }
    }
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}
.admin-container {
  max-width: 1200px;
  margin: auto;
}
.dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.dashboard-item {
  width: calc(25% - 20px);
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
