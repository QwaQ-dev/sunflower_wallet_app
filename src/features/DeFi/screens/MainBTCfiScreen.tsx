import { View, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { RootNavigatorTypeParamListType } from '../../../navigation/types';
import TextWithFont from '../../../shared/components/TextWithFont';

type MainBTCfiScreenProp = NativeStackNavigationProp<RootNavigatorTypeParamListType, 'MainBTCfiScreen'>;

const TABS = ['Stake', 'Pools', 'Borrow', 'Vote'];

export default function MainBTCfiScreen() {
  const navigation = useNavigation<MainBTCfiScreenProp>();
  const route = useRoute();
  

  return (
    <SafeAreaView className="flex-1 bg-custom_background px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between py-4">
        <Pressable onPress={() => navigation.goBack()} className="p-2">
          <ChevronLeft color="white" size={24} />
        </Pressable>
        <TextWithFont customStyle="text-2xl text-white">BTCfi</TextWithFont>
        <Pressable>
        </Pressable>
      </View>

      <View className="flex-row mt-4 bg-custom_border overflow-hidden border-2 border-r-0 border-custom_border">
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => { }}
            className={`flex-1 py-3 items-center justify-center bg-custom_complement border-r-2 border-custom_border`}
          >
            <TextWithFont
              customStyle={'color-white'}
            >
              {tab}
            </TextWithFont>
          </Pressable>
        ))}
      </View>

      
    </SafeAreaView>
  );
}
