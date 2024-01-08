	`<script>
	import router from 'page';

	import Home from "./pages/Home.svelte";
	import About from "./pages/About.svelte";
	import Header from "./components/Header.svelte";
	import Login from "./pages/Login.svelte";
	import CollectorDashboard from "./pages/CollectorDashboard.svelte";
	import ControllerDashboard from "./pages/ControllerDashboard.svelte";
	import Admin from "./pages/AdminRequestsList.svelte";
	import ForgotPassword from "./pages/ForgotPassword.svelte";
	import ClientDashboard from "./pages/ClientHomePage.svelte";
	import RegisterUser from "./pages/AdminCreateUser.svelte"
	import Users from "./pages/AdminUsersList.svelte";
	import UserDetails from "./pages/AdminUserDetails.svelte";
	import Requests from "./pages/AdminRequestsList.svelte";
	import MyOrders from "./pages/ClientOrderList.svelte"
	import OrderDetails from "./pages/ClientOrderDetailsList.svelte"





	let page;
	let params;
	let currentRoute;

	router('/', (ctx) => {
			page = Home;
			currentRoute = ctx.pathname;
	});
	router('/about', (ctx) => {
			page = About;
			currentRoute = ctx.pathname;
	});

	router('/login', (ctx) => {
			page = Login;
			currentRoute = ctx.pathname;
	});

	router('/collector', (ctx) => {
		page = CollectorDashboard;
		currentRoute = ctx.pathname;
	});

	router('/controller', (ctx) => {
		page = ControllerDashboard;
		currentRoute = ctx.pathname;
	});

	router('/admin', (ctx) => {
		page = Admin;
		currentRoute = ctx.pathname;
	});

	router('/forgot-password', (ctx) => {
		page = ForgotPassword;
		currentRoute = ctx.pathname;
	});

	router('/client', (ctx) => {
		page = ClientDashboard;
		currentRoute = ctx.pathname;
	});

	router('/registerUser', (ctx) => {
		page = RegisterUser;
		currentRoute = ctx.pathname;
	});


	router('/users', (ctx) => {
		page = Users;
		currentRoute = ctx.pathname;
	});

	router('/userDetails', (ctx) => {
		page = UserDetails;
		currentRoute = ctx.pathname;
	});

	router('/requests', (ctx) => {
		page = Requests;
		currentRoute = ctx.pathname;
	});

	router('/myOrders', (ctx) =>{
		page = MyOrders;
		currentRoute = ctx.pathname;
	});

	router('/orderDetails', (ctx) =>{
		page = OrderDetails;
		currentRoute = ctx.pathname;
	})



	router.start();
	</script>

	<svelte:head>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
	</svelte:head>

	<main>
		<Header active={currentRoute} />
		<div class="content">
			<svelte:component this={page} {params} />
		</div>
	</main>
	<style>

		:root {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		main {
			text-align: center;
			padding: 1em;
			margin: 0 auto;
			position: relative;
		}
	</style>