//สร้าง Type ขึ้นมาใหม่ทั้งนี้ให้สอดคล้องกับข้อมูลที่จะใช้งาน
export type CoffeeShop = {
  id: string;
  name: string;
  district: string;
  description: string;
  phone: string;
  image_url: string;
  latitude: number;
  longitude: number;
};
