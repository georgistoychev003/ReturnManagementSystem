<script>
 export let active;
 export let userType; // Assuming userType can be 'customer', 'admin', or 'employee'
 import router from 'page'; // Import your router library here

 function handleLogout() {
  // Implement logout functionality here
  // For example, redirect to the logout page or trigger logout action
  // router('/logout'); // Example of using router to navigate to logout page
 }
</script>

<style>
 .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
  background-color: white;
 }

 .logo {
  width: 10vw;
  height: auto;
  max-width: 100%;
 }

 .nav-links {
  display: flex;
  gap: 1vw;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: 35vw;
 }

 .nav-links li {
  font-size: 1em;
  margin-right: 1.5vw;
 }

 .nav-links a {
  text-decoration: none;
  color: #333;
 }

 .user-image {
  width: 4vw;
  height: auto;
  max-width: 100%;
  border-radius: 50%;
 }
</style>

<div class="header">
 <img class="logo" src="https://myshop.s3-external-3.amazonaws.com/shop6116500.images.logo-myshop.webp" alt="Logo">
 <div>
  <ul class="nav-links">
   {#if userType === 'admin'}
    <!-- Show admin-specific links -->
    <li><a href="#">ADMIN DASHBOARD &nbsp; |</a></li>
    <li><a href="#">MANAGE PRODUCTS &nbsp; |</a></li>
    <li><a href="#">MANAGE USERS &nbsp; |</a></li>
   {:else if userType === 'collector'}
    <!-- Show employee-specific links -->
    <li><a href="#">EMPLOYEE DASHBOARD &nbsp; |</a></li>
    <li><a href="#">TASKS &nbsp; |</a></li>
    <li><a href="#">SCHEDULE &nbsp; |</a></li>
   {:else if userType === 'controller'}
    <!-- Show employee-specific links -->
    <li><a href="#">EMPLOYEE DASHBOARD &nbsp; |</a></li>
    <li><a href="#">TASKS &nbsp; |</a></li>
    <li><a href="#">SCHEDULE &nbsp; |</a></li>
   <!--{:else if userType === 'customer'}-->
<!--    Replace below else with above and make an else to always display login only-->
   {:else }
    <!-- Show default links for customer or other user types -->
    <li><a href="#">HOME &nbsp; |</a></li>
    <li><a href="#">MY ORDERS &nbsp; |</a></li>
    <li><a href="#">RETURN REQUESTS &nbsp; |</a></li>
   {/if}
   <li><a href="#" on:click={handleLogout}>LOGOUT</a></li>
  </ul>
 </div>
 <img class="user-image" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="User Image">
</div>