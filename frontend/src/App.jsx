import UserContextProvider from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/main/Layout";
import Content from "./components/main/Content";
import HomePage from "./pages/HomePage";
import View from "./pages/View";
import Hub from "./pages/Hub";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import PreView from "./pages/PreView";
import Registration from "./pages/Registration";
import AppForm from "./pages/AppForm";
import "./App.css";


function App() {

	return (
		<UserContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/UI" element={<Layout />}>
						<Route path="" element={<Content />}>
							<Route index element={<HomePage />} />
							<Route path="view" element={<View />} />
							<Route path="hub" element={<Hub />} />
							<Route path="chat" element={<Chat />} />
							<Route path="profile" element={<Profile />} />
							<Route path="appForm" element={<AppForm />} />
						</Route>
					</Route>
					<Route path="/PI" element={<Content />}>
						<Route index element={<PreView />} />
						<Route path="registration" element={<Registration />} />
					</Route>
					<Route path='*' element={<>Error</>} />
				</Routes>
			</BrowserRouter>
		</UserContextProvider>
	)
}

export default App
