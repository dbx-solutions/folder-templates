import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import Icon from '../Elements/Icon';
import styles from './coming_soon.module.css';

export default function ComingSoon() {
	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.art}>
					<div className={styles.artItem}>{Icon.wait}</div>
				</div>
				<span className={styles.artTagline}>Coming soon!</span>
			</div>
		</Layout>
	);
}
