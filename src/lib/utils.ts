import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ramdomString = () => {
  return Math.random().toString(36).substring(2, 9)
}

export const randomOneOf = (options: string[]) => {
  return options[Math.floor(Math.random() * options.length)]
}

export const capitalize = (str:string) => {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}



export const generateRandomPublicIP = () => {
  const octets = Array(4).fill(0).map(() => Math.floor(Math.random() * 256));

  // Ensure the first octet avoids private ranges (10.x.x.x, 172.16.x.x - 172.31.x.x, 192.168.x.x)
  while (
    (octets[0] === 10) || 
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) || 
    (octets[0] === 192 && octets[1] === 168)
  ) {
    octets[0] = Math.floor(Math.random() * 256);
  }

  return octets.join('.');
};




export const generateRandomPrivateIP = () => {
  const ranges = [
    [10, [0, 255], [0, 255], [0, 255]], // Range: 10.x.x.x
    [172, [16, 31], [0, 255], [0, 255]], // Range: 172.16.x.x - 172.31.x.x
    [192, [168, 168], [0, 255], [0, 255]] // Range: 192.168.x.x
  ];

  // Pick a random range
  const range = ranges[Math.floor(Math.random() * ranges.length)];

  // Generate each octet within the specified range
  const octets = range.map((octetRange) => {
    if (Array.isArray(octetRange)) {
      return Math.floor(Math.random() * (octetRange[1] - octetRange[0] + 1)) + octetRange[0];
    }
    return octetRange;
  });

  return octets.join('.');
};

