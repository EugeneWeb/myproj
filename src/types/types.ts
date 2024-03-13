export type ProfileType = {
    username: string;
    email: string;
    exercises_id: string[];
} & UserType;

export type UserType = {
    location: {
        city: string;
        country: string;
    };
    desc: {
        website: string;
        birthday: string;
        education: string;
    };
    _id: string;
    fullname: string;
    status: string;
    photoUrl: string;
    backgroundUrl: string;
    __v: number;
    friends: string[];
    following: string[];
    posts_id: string[];
};

export type FriendType = {
    name: string;
    path: string;
};
