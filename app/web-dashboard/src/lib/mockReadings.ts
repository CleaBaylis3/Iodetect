import type { Reading } from "@/types/reading";

export const mockReadings: Reading[] = [
  {
    id: "r1",
    timestamp: "2026-03-01T10:15:00Z",
    iodine_ug_L: 82,
    status: "LOW",
    location: {
      country: "Canada",
      city: "Kingston",
      lat: 44.2312,
      lon: -76.486,
    },
    user: {
      id: "user-001",
      age: 21,
      gender: "M",
    },
  },
  {
    id: "r2",
    timestamp: "2026-03-01T12:30:00Z",
    iodine_ug_L: 145,
    status: "NORMAL",
    location: {
      country: "India",
      city: "Delhi",
      lat: 28.6139,
      lon: 77.209,
    },
    user: {
      id: "user-002",
      age: 19,
      gender: "F",
    },
  },
  {
    id: "r3",
    timestamp: "2026-03-02T08:00:00Z",
    iodine_ug_L: 230,
    status: "HIGH",
    location: {
      country: "Kenya",
      city: "Nairobi",
      lat: -1.2864,
      lon: 36.8172,
    },
    user: {
      id: "user-003",
      age: 25,
      gender: "F",
    },
  },
  {
    id: "r4",
    timestamp: "2026-03-02T14:10:00Z",
    iodine_ug_L: 96,
    status: "LOW",
    location: {
      country: "Brazil",
      city: "São Paulo",
      lat: -23.5505,
      lon: -46.6333,
    },
    user: {
      id: "user-004",
      age: 31,
      gender: "M",
    },
  },
  {
    id: "r5",
    timestamp: "2026-03-03T09:45:00Z",
    iodine_ug_L: 167,
    status: "NORMAL",
    location: {
      country: "United Kingdom",
      city: "London",
      lat: 51.5072,
      lon: -0.1276,
    },
    user: {
      id: "user-005",
      age: 27,
      gender: "U",
    },
  },
];
