<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img src="" alt="在线刷题平台">
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarNav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/题库" class="nav-link">题库</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/面试" class="nav-link">面试</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2 search-input" type="search" placeholder="搜索" aria-label="Search">
          <button class="btn btn-outline-success search-button" type="submit">搜索</button>
        </form>
        <div class="d-flex">
          <button class="btn btn-success me-3" type="button">登录</button>
          <button class="btn btn-success" type="button">注册</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
.navbar {
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #ffffff;
}

.nav-link:hover {
  color: #8bc34a;
}

.btn-success {
  color: #ffffff;
  background-color: #8bc34a;
  border-color: #8bc34a;
}

.btn-success:hover {
  color: #8bc34a;
  background-color: #ffffff;
}

.search-input {
  color: #8bc34a;
  background-color: #ffffff;
  border: 1px solid #8bc34a;
}

.search-input:focus {
  color: #8bc34a;
  background-color: #ffffff;
  border-color: #8bc34a;
  box-shadow: none;
}

.search-button {
  color: #8bc34a;
  border-color: #8bc34a;
}

.search-button:hover {
  color: #ffffff;
  background-color: #8bc34a;
  border-color: #8bc34a;
}
</style>
