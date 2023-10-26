export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  tags: string[];
};

export type User = {
  id: string;
  name: string;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geo: {
      lat: number;
      long: number;
    };
  };
};
