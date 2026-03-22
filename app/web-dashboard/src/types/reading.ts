export type IodineStatus = "LOW" | "NORMAL" | "HIGH";
export type Gender = "M" | "F" | "X" | "U";

export type Reading = {
  id: string;
  timestamp: string; // ISO string
  iodine_ug_L: number;
  status: IodineStatus;

  location: {
    country: string;
    city: string;
    lat: number;
    lon: number;
  };

  user: {
    id: string; // anonymized
    age: number | null;
    gender: Gender;
  };
};
