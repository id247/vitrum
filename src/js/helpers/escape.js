import XmlEntities from 'html-entities/lib/xml-entities.js';
const entities = new XmlEntities();

export function HTMLencode(str){
	return entities.encode(str);
}
export function HTMLdecode(str){
	return entities.decode(str);
}
