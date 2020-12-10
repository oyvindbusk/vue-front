<template>
<b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/">Variant browser</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
     <b-navbar-nav>
        <b-nav-item to="/samples">Samples</b-nav-item>
        <b-nav-item to="/variants">Variants</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
          
          <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
</b-navbar>
</template>

<script>
export default {
    name: "navbar"
}
</script>