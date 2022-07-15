import React from 'react';
import ApiRoutes from '../../ApiRoutes';
import Button from '../Elements/Button/Button';
import Icon from '../Elements/Icon';

export default function OAuth() {
	function connectToDropbox() {
		fetch(ApiRoutes.authUrl)
			.then((res) => res.json())
			.then((data) => window.location.replace(data.authUrl));
	}

	return <Button icon={Icon.link} caption="Sign in with Dropbox" handleOnClick={connectToDropbox} color="gray" />;
}
