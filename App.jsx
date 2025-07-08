import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import addIcon from './assets/icons8-plus-24.png';
import searchIcon from './assets/icons8-search-50.png';
import calendarIcon from './assets/icons8-calendar-48.png';
import helpIcon from './assets/icons8-info-24.png';
import greenCheckIcon from './assets/icons8-checkmark-24.png';
import habitIcon from './assets/icons8-brain-50.png';
import recurringIcon from './assets/icons8-repeat-24.png';
import taskIcon from './assets/icons8-tick-50.png';
import goalIcon from './assets/icons8-goal-50.png';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [selectedDate, setSelectedDate] = useState(18);
  const [progress, setProgress] = useState(66);
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tempProgress, setTempProgress] = useState(66);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const slideAnim = useRef(new Animated.Value(height)).current;

  // Theme colors
  const themes = {
    light: {
      backgroundColor: '#FFFFFF',
      cardBackground: '#FFFFFF',
      textPrimary: '#333333',
      textSecondary: '#666666',
      textTertiary: '#777777',
      borderColor: '#E0E0E0',
      shadowColor: '#000000',
      modalOverlay: 'rgba(0, 0, 0, 0.5)',
      quoteBackground: '#F8F9FF',
      dateItemBackground: '#F1F1F1',
      primaryColor: '#3F51B5',
      successColor: '#4CAF50',
      surfaceColor: '#FAFAFA',
      iconTint: '#666666',
    },
    dark: {
      backgroundColor: '#121212',
      cardBackground: '#1E1E1E',
      textPrimary: '#FFFFFF',
      textSecondary: '#B0B0B0',
      textTertiary: '#888888',
      borderColor: '#333333',
      shadowColor: '#000000',
      modalOverlay: 'rgba(0, 0, 0, 0.8)',
      quoteBackground: '#2A2A2A',
      dateItemBackground: '#2A2A2A',
      primaryColor: '#5C6BC0',
      successColor: '#66BB6A',
      surfaceColor: '#2A2A2A',
      iconTint: '#B0B0B0',
    }
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  const dates = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 15; i <= 28; i++) {
    const dayIndex = (i - 15) % 7;
    dates.push({
      day: i,
      dayName: dayNames[dayIndex]
    });
  }

  const tasks = [
    {
      id: 1,
      icon: 'people',
      title: "Schedule a meeting with Harshit Sir",
      time: "8:00 AM",
      tags: ["Habit", "Work"],
      completed: true,
      description: "Important meeting with Harshit Sir to discuss project updates and future plans."
    },
    {
      id: 2,
      icon: 'meditation',
      title: "2.5 Hours Simran and Meditation",
      time: "6:00 AM",
      tags: ["Habit", "Must"],
      completed: false,
      description: "Daily meditation and spiritual practice for mental clarity and peace."
    },
    {
      id: 3,
      icon: 'money',
      title: "Save 200 Rupees Daily",
      time: "10:00 AM",
      tags: ["Habit", "Must"],
      completed: false,
      description: "Daily savings goal to build financial discipline and emergency fund."
    },
    {
      id: 4,
      icon: 'walk',
      title: "Walk 10k Step Daily",
      time: "7:00 AM",
      tags: ["Habit", "Important"],
      completed: false,
      description: "Daily walking routine to maintain physical health and fitness."
    },
    {
      id: 5,
      icon: 'flower',
      title: "Buy Sunflower for Mumma",
      time: "11:00 AM",
      tags: ["Task", "Important"],
      completed: false,
      description: "Purchase beautiful sunflowers to surprise and make Mumma happy."
    },
    {
      id: 6,
      icon: 'palette',
      title: "Make Mandala and Colour Daily",
      time: "9:00 AM",
      tags: ["Task", "Important"],
      completed: false,
      description: "Creative activity for relaxation and artistic expression through mandala art."
    }
  ];

  const addOptions = [
    {
      id: 1,
      title: "Habit",
      icon: habitIcon,
      description: "Activity that repeats over time it has detailed tracking and statistics."
    },
    {
      id: 2,
      title: "Recurring Task",
      icon: recurringIcon,
      description: "Activity that repeats over time it has detailed tracking and statistics."
    },
    {
      id: 3,
      title: "Task",
      icon: taskIcon,
      description: "Single instance activity without tracking over time."
    },
    {
      id: 4,
      title: "Goal of the Day",
      icon: goalIcon,
      description: "A specific target set for oneself to achieve within a single day."
    }
  ];

  const getTagStyle = (tag) => {
    const baseStyles = {
      'Habit': { backgroundColor: isDarkMode ? '#1A237E' : '#E3F2FD', color: isDarkMode ? '#64B5F6' : '#1976D2' },
      'Work': { backgroundColor: isDarkMode ? '#4A148C' : '#F3E5F5', color: isDarkMode ? '#CE93D8' : '#7B1FA2' },
      'Must': { backgroundColor: isDarkMode ? '#B71C1C' : '#FFEBEE', color: isDarkMode ? '#EF5350' : '#D32F2F' },
      'Important': { backgroundColor: isDarkMode ? '#E65100' : '#FFF3E0', color: isDarkMode ? '#FFB74D' : '#F57C00' },
      'Task': { backgroundColor: isDarkMode ? '#1B5E20' : '#E8F5E8', color: isDarkMode ? '#81C784' : '#388E3C' },
      'default': { backgroundColor: isDarkMode ? '#333333' : '#F5F5F5', color: isDarkMode ? '#B0B0B0' : '#616161' }
    };
    return baseStyles[tag] || baseStyles.default;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setIsTaskModalVisible(true);
  };

  const openAddModal = () => {
    setIsAddModalVisible(true);
    slideAnim.setValue(height);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeAddModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsAddModalVisible(false);
    });
  };

  const handleAddOption = (option) => {
    Alert.alert(
      option.title,
      `You selected: ${option.title}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => closeAddModal() }
      ]
    );
  };

  const updateProgress = () => {
    setProgress(tempProgress);
    Alert.alert('Progress Updated', `Progress set to ${tempProgress}%`);
  };

  const toggleTaskCompletion = (taskId) => {
    Alert.alert('Task Updated', 'Task completion status changed');
  };

  const CustomSlider = ({ value, onValueChange, minimumValue = 0, maximumValue = 100 }) => {
    const sliderWidth = 250;
    const thumbSize = 20;
    const trackHeight = 4;

    const pan = useRef(new Animated.Value(0)).current;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newValue = Math.max(0, Math.min(sliderWidth - thumbSize, gestureState.dx));
        pan.setValue(newValue);
        const percentage = (newValue / (sliderWidth - thumbSize)) * (maximumValue - minimumValue) + minimumValue;
        onValueChange(Math.round(percentage));
      },
      onPanResponderRelease: () => {
        
      },
    });

    const thumbPosition = ((value - minimumValue) / (maximumValue - minimumValue)) * (sliderWidth - thumbSize);

    return (
      <View style={styles.customSliderContainer}>
        <View style={[styles.sliderTrack, { width: sliderWidth, backgroundColor: currentTheme.borderColor }]}>
          <View style={[styles.sliderFill, { width: thumbPosition + thumbSize / 2, backgroundColor: currentTheme.primaryColor }]} />
          <Animated.View
            style={[
              styles.sliderThumb,
              {
                left: thumbPosition,
                backgroundColor: currentTheme.primaryColor,
                transform: [{ translateX: pan }],
              }
            ]}
            {...panResponder.panHandlers}
          />
        </View>
      </View>
    );
  };

  const IconPlaceholder = ({ iconName, size = 24, color }) => (
    <View style={[styles.iconPlaceholder, { 
      width: size, 
      height: size, 
      backgroundColor: color || currentTheme.primaryColor 
    }]}>
      <Text style={[styles.iconText, { fontSize: size * 0.4 }]}>
        {iconName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );

  const ThemeToggle = () => (
    <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
      <View style={[styles.themeToggleTrack, { backgroundColor: isDarkMode ? currentTheme.primaryColor : currentTheme.borderColor }]}>
        <Animated.View style={[
          styles.themeToggleThumb,
          {
            backgroundColor: currentTheme.backgroundColor,
            transform: [{ translateX: isDarkMode ? 20 : 0 }]
          }
        ]}>
          <Text style={[styles.themeToggleIcon, { color: isDarkMode ? '#FFC107' : '#FF9800' }]}>
            {isDarkMode ? '🌙' : '☀️'}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: currentTheme.backgroundColor,
      borderBottomWidth: isDarkMode ? 1 : 0,
      borderBottomColor: currentTheme.borderColor,
    },
    appName: {
      fontSize: 18,
      fontWeight: '600',
      color: currentTheme.textPrimary,
    },
    dateItem: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 24,
      marginRight: 10,
      width: 50,
      height: 65,
      backgroundColor: currentTheme.dateItemBackground,
    },
    selectedDateItem: {
      backgroundColor: currentTheme.primaryColor,
    },
    dayName: {
      fontSize: 12,
      color: currentTheme.textTertiary,
      marginBottom: 4,
      fontWeight: '500',
    },
    selectedDayName: {
      color: '#FFFFFF',
    },
    dayNumber: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.textPrimary,
    },
    selectedDayNumber: {
      color: '#FFFFFF',
    },
    quoteContainer: {
      margin: 16,
      padding: 16,
      backgroundColor: currentTheme.quoteBackground,
      borderRadius: 12,
    },
    quoteTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: currentTheme.textPrimary,
      marginBottom: 8,
    },
    quoteText: {
      fontSize: 14,
      color: currentTheme.textSecondary,
      lineHeight: 20,
      marginBottom: 1,
    },
    progressText: {
      fontSize: 14,
      color: currentTheme.primaryColor,
      marginLeft: 5,
      marginBottom: 10,
    },
    updateButton: {
      backgroundColor: currentTheme.primaryColor,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      marginTop: 8,
    },
    updateButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
    },
    taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      marginBottom: 12,
      backgroundColor: currentTheme.cardBackground,
      borderRadius: 12,
      shadowColor: currentTheme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: currentTheme.borderColor,
    },
    taskTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: currentTheme.textPrimary,
      marginBottom: 4,
    },
    taskTimeText: {
      fontSize: 12,
      color: currentTheme.textSecondary,
      marginLeft: 4,
    },
    uncompletedIcon: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: currentTheme.borderColor,
      borderRadius: 12,
    },
    fab: {
      position: 'absolute',
      right: 24,
      bottom: 24,
      width: 56,
      height: 56,
      backgroundColor: currentTheme.primaryColor,
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: currentTheme.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: currentTheme.modalOverlay,
    },
    taskModal: {
      backgroundColor: currentTheme.cardBackground,
      borderRadius: 16,
      padding: 20,
      margin: 20,
      maxHeight: height * 0.7,
      position: 'absolute',
      top: '15%',
      left: 0,
      right: 0,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: currentTheme.textPrimary,
    },
    taskDetailTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.textPrimary,
      marginLeft: 12,
      flex: 1,
    },
    taskDetailTime: {
      fontSize: 14,
      color: currentTheme.textSecondary,
      marginBottom: 12,
    },
    taskDetailDescription: {
      fontSize: 14,
      color: currentTheme.textSecondary,
      lineHeight: 20,
      marginBottom: 16,
    },
    completeButton: {
      backgroundColor: currentTheme.primaryColor,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    completedButton: {
      backgroundColor: currentTheme.successColor,
    },
    completeButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    addModal: {
      backgroundColor: currentTheme.cardBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      minHeight: 400,
      maxHeight: height * 0.8,
    },
    modalHandle: {
      width: 40,
      height: 4,
      backgroundColor: currentTheme.borderColor,
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 20,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 12,
      backgroundColor: currentTheme.cardBackground,
      borderBottomColor: currentTheme.borderColor,
      borderBottomWidth: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: currentTheme.textPrimary,
      marginBottom: 2,
    },
    optionDescription: {
      fontSize: 13,
      color: currentTheme.textSecondary,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={currentTheme.backgroundColor} 
      />

      {/* Header */}
      <View style={dynamicStyles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>W</Text>
          </View>
          <Text style={dynamicStyles.appName}>WingsFly</Text>
        </View>
        <View style={styles.headerRight}>
          <ThemeToggle />
          <TouchableOpacity style={styles.headerIcon}>
            <Image 
              source={searchIcon} 
              style={[styles.headerIconImage, { tintColor: currentTheme.iconTint }]} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Image 
              source={calendarIcon} 
              style={[styles.headerIconImage, { tintColor: currentTheme.iconTint }]} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Image 
              source={helpIcon} 
              style={[styles.headerIconImage, { tintColor: currentTheme.iconTint }]} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Picker - Horizontally Scrollable */}
        <View style={styles.datePickerContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datePicker}
          >
            {dates.map((date) => (
              <TouchableOpacity
                key={date.day}
                style={[
                  dynamicStyles.dateItem,
                  selectedDate === date.day && dynamicStyles.selectedDateItem
                ]}
                onPress={() => setSelectedDate(date.day)}
              >
                <Text style={[
                  dynamicStyles.dayName,
                  selectedDate === date.day && dynamicStyles.selectedDayName
                ]}>
                  {date.dayName}
                </Text>
                <Text style={[
                  dynamicStyles.dayNumber,
                  selectedDate === date.day && dynamicStyles.selectedDayNumber
                ]}>
                  {date.day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Today's Quote with Adjustable Progress */}
        <View style={dynamicStyles.quoteContainer}>
          <Text style={dynamicStyles.quoteTitle}>Today's Quote</Text>
          <Text style={dynamicStyles.quoteText}>
            "You must do the things, you think you cannot do."
          </Text>
          <Text style={dynamicStyles.progressText}>Progress {progress}%</Text>
          <View style={styles.progressContainer}>
            <CustomSlider
              value={tempProgress}
              onValueChange={setTempProgress}
              minimumValue={0}
              maximumValue={100}
            />
          </View>
          <View style={styles.sliderContainer}>
            <TouchableOpacity style={dynamicStyles.updateButton} onPress={updateProgress}>
              <Text style={dynamicStyles.updateButtonText}>Update Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task List */}
        <View style={styles.taskList}>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={dynamicStyles.taskItem}
              onPress={() => openTaskModal(task)}
            >
              <View style={styles.taskIcon}>
                <IconPlaceholder iconName={task.icon} size={20} />
              </View>
              <View style={styles.taskContent}>
                <Text style={dynamicStyles.taskTitle}>{task.title}</Text>
                <View style={styles.taskMeta}>
                  <View style={styles.taskTime}>
                    <IconPlaceholder iconName="time" size={12} color={currentTheme.textSecondary} />
                    <Text style={dynamicStyles.taskTimeText}>{task.time}</Text>
                  </View>
                  <View style={styles.taskTags}>
                    {task.tags.map((tag, index) => (
                      <View
                        key={index}
                        style={[styles.tag, getTagStyle(tag)]}
                      >
                        <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.taskStatus}
                onPress={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? (
                  <View style={styles.completedIcon}>
                    <Image source={greenCheckIcon} style={styles.completedIconImage} />
                  </View>
                ) : (
                  <View style={dynamicStyles.uncompletedIcon} />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Task Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isTaskModalVisible}
        onRequestClose={() => setIsTaskModalVisible(false)}
      >
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.taskModal}>
            <View style={styles.modalHeader}>
              <Text style={dynamicStyles.modalTitle}>Task Details</Text>
              <TouchableOpacity onPress={() => setIsTaskModalVisible(false)}>
                <IconPlaceholder iconName="close" size={24} color={currentTheme.textSecondary} />
              </TouchableOpacity>
            </View>
            {selectedTask && (
              <View style={styles.modalContent}>
                <View style={styles.taskDetailHeader}>
                  <IconPlaceholder iconName={selectedTask.icon} size={32} />
                  <Text style={dynamicStyles.taskDetailTitle}>{selectedTask.title}</Text>
                </View>
                <Text style={dynamicStyles.taskDetailTime}>⏰ {selectedTask.time}</Text>
                <Text style={dynamicStyles.taskDetailDescription}>{selectedTask.description}</Text>
                <View style={styles.taskDetailTags}>
                  {selectedTask.tags.map((tag, index) => (
                    <View key={index} style={[styles.tag, getTagStyle(tag)]}>
                      <Text style={[styles.tagText, { color: getTagStyle(tag).color }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={[dynamicStyles.completeButton, selectedTask.completed && dynamicStyles.completedButton]}
                  onPress={() => toggleTaskCompletion(selectedTask.id)}
                >
                  <Text style={dynamicStyles.completeButtonText}>
                    {selectedTask.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Modal with Slide Animation from Bottom */}
      <Modal
        animationType="none"
        transparent={true}
        visible={isAddModalVisible}
        onRequestClose={closeAddModal}
      >
        <View style={dynamicStyles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            onPress={closeAddModal}
            activeOpacity={1}
          />
          <Animated.View
            style={[
              dynamicStyles.addModal,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={dynamicStyles.modalHandle} />
            <View style={styles.addOptionsContainer}>
              {addOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={dynamicStyles.optionItem}
                  onPress={() => handleAddOption(option)}
                >
                  <Image 
                    source={option.icon} 
                    style={[styles.optionIcon, { tintColor: currentTheme.iconTint }]} 
                  />
                  <View style={styles.optionTextContainer}>
                    <Text style={dynamicStyles.optionTitle}>{option.title}</Text>
                    <Text style={dynamicStyles.optionDescription}>{option.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Floating Add Button */}
      <TouchableOpacity style={dynamicStyles.fab} onPress={openAddModal}>
        <Image source={addIcon} style={styles.fabIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#3F51B5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  themeToggle: {
    marginRight: 8,
  },
  themeToggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    position: 'relative',
  },
  themeToggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 2,
  },
  themeToggleIcon: {
    fontSize: 12,
  },
  content: {
    flex: 1,
  },
  datePickerContainer: {
    paddingVertical: 4,
  },
  datePicker: {
    paddingHorizontal: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sliderContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  customSliderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  taskIcon: {
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  taskTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  taskTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  taskTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 4,
    marginTop: 2,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  taskStatus: {
    marginLeft: 12,
  },
  completedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedIconImage: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },

  uncompletedIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    backgroundColor: '#3F51B5',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
    resizeMode: 'contain',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackdrop: {
    flex: 1,
  },
  taskModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxHeight: height * 0.7,
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalContent: {
    flex: 1,
  },
  taskDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskDetailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  taskDetailTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  taskDetailDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  taskDetailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  completeButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 400,
    maxHeight: height * 0.8,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  optionIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 2,
  },

  optionDescription: {
    fontSize: 13,
    color: '#666',
  },

  optionArrow: {
    width: 18,
    height: 18,
    tintColor: '#666',
    marginLeft: 12,
    resizeMode: 'contain',
  }
  ,
  addModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  addOptionsContainer: {
    flex: 1,
  },
  addOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
  },
  addOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  addOptionIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  addOptionText: {
    flex: 1,
  },
  addOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  addOptionDescription: {
    fontSize: 14,
    color: '#666',
  },
  chevronIcon: {
    marginLeft: 8,
  },
  iconPlaceholder: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
export default App;