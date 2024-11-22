import { useRouter } from 'next/router';

const RegisterButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/register')}
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
    >
      Registrarse
    </button>
  );
};

export default RegisterButton;