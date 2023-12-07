<script>
 export let active;
 import router from 'page';
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
   <li><a href="#">DASHBOARD &nbsp; |</a></li>
   <li><a href="#">RETURN REQUESTS &nbsp; |</a></li>
   <li><a href="#">LOGOUT</a></li>
  </ul>
 </div>
 <img class="user-image" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="User Image">
</div>
