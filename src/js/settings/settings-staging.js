// export const OAuthOptions = {
// 	authUrl: 'https://login.feature01.dnevnik.ru/oauth2',
// 	grantUrl: 'https://api.feature01.dnevnik.ru/v1/authorizations',
// 	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
// 	clientId: '5123975fe9eb415390fb7aa316a15e4e',
// 	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
// }

// export const APIoptions = {	
// 	base: 'https://api.feature01.dnevnik.ru/v1/',
// }

// export const PromoOptions = {	
// 	url: 'http://feature01.dnevnik.ru/promo/wishlist3',
// 	server: 'https://feature01.dnevnik.ru',
// }

// export const ForumOptions = {	
// 	pageSize: 5,
// 	psyhoId: '1000001035607',
// 	postsLabel: 'posts-test-1',
// }


export const OAuthOptions = {
	provider: 'app',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Birthday,Age,Roles,Files,Sex',	
	clientId: 'f84accc763e34b5b83469c9ef1a9ea62',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnenvik.ru/promo/hidden-forum',
	server: 'https://dnevnik.ru',
	endQuizLink: 'https://wiki.dnevnik.ru/view.aspx?network=1000000386504&pageTitle=%u041a%u0430%u043a%u0438%u0435%20%u0432%u0438%u0442%u0430%u043c%u0438%u043d%u044b%20%u043d%u0443%u0436%u043d%u044b%20%u0448%u043a%u043e%u043b%u044c%u043d%u0438%u043a%u0443',
}

export const ForumOptions = {	
	pageSize: 15,
	psyhoId: '1000005449055,1000005031742',
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
	postsLabel: {
		mothers: 'posts-test-1',
		girls: 'posts-test-2',
		competition: 'posts-test-3',
	},
}
