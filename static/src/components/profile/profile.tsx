import avatar from '@/assets/avatar.jpeg';
import { calRemToPixels } from '@/constants/common';
import { ElAvatar } from 'element-plus';
import { defineComponent } from 'vue';
import { APP_LIST, AVATAR_SIZE } from './constants';
import { calAvatarBottomPadding } from './profile';
import styles from './profile.module.css';

export default defineComponent({
	name: 'Profile',
	setup() {
		return () => (
			<div class={styles['profile']}>
				<div class={styles['avatar-container']}>
					<ElAvatar
						class={styles['avatar']}
						size={calRemToPixels(AVATAR_SIZE)}
						src={avatar}
					/>
				</div>
				<div
					class={styles['profile-info']}
					style={{ paddingTop: calAvatarBottomPadding() }}
				>
					<div class={styles['profile-name']}>
						<a href="/about">feiyyx</a>
					</div>
					<div class={styles['profile-app']}>
						{APP_LIST.map((app) => (
							<a
								href={app.link}
								target="_blank"
								rel="noopener noreferrer"
								key={app.name}
								class={styles['profile-app-icon-wrapper']}
							>
								<img class={styles['profile-app-icon']} src={app.icon} />
							</a>
						))}
					</div>
					<div class={styles['profile-description']}>卑微前端在线切图</div>
				</div>
			</div>
		);
	},
});
