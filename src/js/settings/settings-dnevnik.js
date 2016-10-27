export const OAuthOptions = {
	provider: 'vitrumDnevnik',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Files',	
	clientId: 'fa9ac37c81074b5398f1ba061c1c367a',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnevnik.ru/promo/vitrum',
	server: 'https://dnevnik.ru',
	endQuizLink: 'https://wiki.dnevnik.ru/view.aspx?network=1000000386504&pageTitle=%u041a%u0430%u043a%u0438%u0435%20%u0432%u0438%u0442%u0430%u043c%u0438%u043d%u044b%20%u043d%u0443%u0436%u043d%u044b%20%u0448%u043a%u043e%u043b%u044c%u043d%u0438%u043a%u0443',
}

export const CommentsOptions = {	
	pageSize: 15,
	adminId: ['1111111111111111'],
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
}
