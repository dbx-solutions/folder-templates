import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import AuthToken from './components/Auth/AuthToken';
import FolderStructure from './components/FolderStructure/FolderStructure';
import ComingSoon from './components/ComingSoon/ComingSoon';

export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/auth/token" element={<AuthToken />} />
			<Route path="/folder-structure/create/" element={<FolderStructure />} />
			<Route path="/template/create" element={<ComingSoon />} />
			<Route path="/template/view" element={<ComingSoon />} />
		</Routes>
	);
}
