import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../constants/colors';
import { iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SongCard from '../components/SongCard';
import { featuredSongs, popularSongs, categories } from '../data/mockData'; // Mock data for songs

const { width } = Dimensions.get('window'); // Get the device width for dynamic layout

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Open menu"
          accessibilityHint="Opens the navigation menu"
        >
          <Entypo
            name="menu"
            size={iconSizes.lg}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Search"
          accessibilityHint="Opens the search screen"
        >
          <FontAwesome
            name="search"
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <Text style={styles.headingText}>Discover Your Music</Text>

      {/* Featured Section */}
      <Text style={styles.sectionTitle}>Featured Albums</Text>
      <FlatList
        data={featuredSongs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.featuredCard}>
            <Image source={{ uri: item.image }} style={styles.featuredImage} />
            <Text style={styles.featuredText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Popular Songs Section */}
      <Text style={styles.sectionTitle}>Popular Songs</Text>
      <FlatList
        data={popularSongs}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongCard title={item.title} artist={item.artist} image={item.image} />
        )}
      />

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>Browse by Categories</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="home" size={iconSizes.md} color={colors.iconPrimary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="music" size={iconSizes.md} color={colors.iconSecondary} />
          <Text style={styles.navText}>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user" size={iconSizes.md} color={colors.iconSecondary} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  headingText: {
    fontSize: width * 0.06,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fontFamilies.bold,
    color: colors.textPrimary,
    marginVertical: spacing.md,
  },
  featuredCard: {
    marginRight: spacing.md,
  },
  featuredImage: {
    width: width * 0.6,
    height: width * 0.4,
    borderRadius: 10,
  },
  featuredText: {
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: spacing.lg,
  },
  categoryCard: {
    backgroundColor: colors.cardBackground,
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
    width: '48%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: fontFamilies.medium,
    color: colors.textPrimary,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    backgroundColor: colors.navBackground,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    fontFamily: fontFamilies.medium,
    color: colors.textPrimary,
  },
});
