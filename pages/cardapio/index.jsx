import { useQRCode } from "next-qrcode";
  
export default function Cardapio() {
  const { Canvas } = useQRCode();

  return (
    <Canvas
      text={'https://github.com/bunlong/next-qrcode'}
      options={{
        level: 'M',
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: '#583101',
          light: '#FFEFDF',
        },
      }}
    />
  );
} 