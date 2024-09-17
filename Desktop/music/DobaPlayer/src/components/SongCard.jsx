import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import imageUrl from '../../assets/a.jpg';
import {colors} from '../constants/colors';
import {spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';

const SongCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.text}>SongCard</Text>
      <Text style={styles.artist}>MKALIMANI</Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    cursor: 'pointer',
  },
  image: {
    width: 225,
    height: 225,
    borderRadius: 10,
  },
  text: {
    fontSize: 17,
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    padding: spacing.sm,
  },
  artist: {
    fontSize: 15,
    color: colors.textSecondary,
    fontFamily: fontFamilies.regular,
    padding: spacing.sm,
    paddingTop: -10,
  },
});
