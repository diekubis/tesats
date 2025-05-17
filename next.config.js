/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is only needed if you're using Next.js with Expo
  // If you're using pure Expo Web, you don't need this file
  transpilePackages: [
    'react-native',
    'expo',
    'expo-router',
    '@expo/vector-icons',
    'react-native-svg',
    'react-native-web',
    'expo-linking',
    'expo-constants',
    'expo-status-bar',
    'expo-modules-core',
    'expo-linear-gradient',
    'lucide-react-native',
  ],
};

module.exports = nextConfig;