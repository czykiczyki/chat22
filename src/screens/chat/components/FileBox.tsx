import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../theme';
import SvgIcon from '../../../components/SvgIcon';

type FileBoxProps = {
  file: {
    uri: string;
    name: string;
    type: string;
  };
  onRemove: (uri: string) => void;
};

const FileBox: React.FC<FileBoxProps> = ({ file, onRemove }) => {
  const isImage = file.type.startsWith('image/');

  return (
    <View style={styles.fileBox}>
      <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(file.uri)}>
        <SvgIcon.Close color={colors.error} width={18} />
      </TouchableOpacity>
      {isImage ? (
        <Image source={{ uri: file.uri }} style={styles.imagePreview} />
      ) : (
        <>
          <Text style={styles.fileName} numberOfLines={1}>
            {file.name}
          </Text>
          <Text style={styles.fileType}>{file.type}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fileBox: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    padding: 5,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 10,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  fileName: {
    color: colors.text,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  fileType: {
    color: colors.grey,
    fontSize: 10,
    textAlign: 'center',
  },
});

export default FileBox;
