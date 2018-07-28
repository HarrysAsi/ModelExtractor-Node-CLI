class User  extends Model {
    constructor(id = 0 ,email = ""  ,password = ""  ,name = ""  ,surname = ""  ,birthdate = 0 ,mobile_tel = ""  ,image_id = 0 ,country = ""  ,user_type = 0 ,date_created = 0 ,date_updated = 0 ){
        super(user);
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.birthdate = birthdate;
        this.mobile_tel = mobile_tel;
        this.image_id = image_id;
        this.country = country;
        this.user_type = user_type;
        this.date_created = date_created;
        this.date_updated = date_updated;
    }
    toMemory() {
        runtime.user[this.id] = this;
    }
    get attributes() {
        let array = {
            id: {
                value: this.id,
                visible: true,
                label: "id",
                type: "number",
                primary: true
            },
            email: {
                value: this.email,
                visible: true,
                label: "email",
                type: "string",
                primary: false
            },
            password: {
                value: this.password,
                visible: true,
                label: "password",
                type: "string",
                primary: false
            },
            name: {
                value: this.name,
                visible: true,
                label: "name",
                type: "string",
                primary: false
            },
            surname: {
                value: this.surname,
                visible: true,
                label: "surname",
                type: "string",
                primary: false
            },
            birthdate: {
                value: this.birthdate,
                visible: true,
                label: "birthdate",
                type: "date",
                primary: false
            },
            mobile_tel: {
                value: this.mobile_tel,
                visible: true,
                label: "mobile_tel",
                type: "string",
                primary: false
            },
            image_id: {
                value: this.image_id,
                visible: true,
                label: "image_id",
                type: "number",
                primary: false
            },
            country: {
                value: this.country,
                visible: true,
                label: "country",
                type: "string",
                primary: false
            },
            user_type: {
                value: this.user_type,
                visible: true,
                label: "user_type",
                type: "number",
                primary: false
            },
            date_created: {
                value: this.date_created,
                visible: true,
                label: "date_created",
                type: "date",
                primary: false
            },
            date_updated: {
                value: this.date_updated,
                visible: true,
                label: "date_updated",
                type: "date",
                primary: false
            },
        };
        return array;
    }

}