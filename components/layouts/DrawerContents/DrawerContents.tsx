import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import useColorScheme from '@/hooks/useColorScheme';
import { colors } from '@/theme';
import { useNavigationState } from '@react-navigation/native'; // For accessing the current route

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default function DrawerContents() {
  const { isDark } = useColorScheme();
  const routeName = useNavigationState(state => state?.routeNames[state.index]);

  return (
    <SafeAreaView>
      <View style={[styles.root, isDark && { backgroundColor: colors.blackGray }]}>
        <Text style={{ color: isDark ? colors.white : colors.black }}>
          {routeName === 'Profile' ? 'Profile Menu' : 'Tabs Menu'}
        </Text>

        {/* Conditionally render different options */}
        {routeName === 'Profile' ? (
          <View>
            <Text style={{ color: isDark ? colors.white : colors.black }}>
              Profile-specific options
            </Text>
            {/* Add more profile-related menu items here */}
          </View>
        ) : (
          <View>
            <Text style={{ color: isDark ? colors.white : colors.black }}>
              Tabs-specific options
            </Text>
            {/* Add more tabs-related menu items here */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
