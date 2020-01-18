const { fake } = require('sinon');
const EventEmitter = require('events');
const proxyquire = require('proxyquire').noCallThru();
const MiLightClient = require('../mocks.test');

const MiLightService = proxyquire('../../../../services/mi-light/index', {
  'node-milight-promise': MiLightClient,
});

const StateManager = require('../../../../lib/state');

const event = new EventEmitter();
const stateManager = new StateManager(event);
const deviceManager = {
  get: fake.resolves([
    {
      id: '87d03a3e-5540-4dd1-85cc-be86578118c4',
      service_id: 'a810b8db-6d04-4697-bed3-c4b72c996279',
      room_id: null,
      name: 'Mi Light Bridge',
      selector: 'mi-light-bridge-001b44113ab7',
      model: 'mi-light-bridge',
      external_id: 'mi-light:bridge:001b44113ab7',
      should_poll: false,
      poll_frequency: null,
      features: [],
      params: [
        {
          id: 'b6cc79bd-7080-4204-9631-131a7aba0b76',
          device_id: '87d03a3e-5540-4dd1-85cc-be86578118c4',
          name: 'BRIDGE_IP_ADDRESS',
          value: '192.168.10.245',
        },
        {
          id: '5d9f76db-e23b-46c0-9d93-36c7f9b494b4',
          device_id: '87d03a3e-5540-4dd1-85cc-be86578118c4',
          name: 'BRIDGE_NAME',
          value: 'Mi Light Bridge',
        },
        {
          id: '5cfc35c3-06a0-493e-955a-d3854b0c649d',
          device_id: '87d03a3e-5540-4dd1-85cc-be86578118c4',
          name: 'BRIDGE_MAC',
          value: '00:1b:44:11:3a:b7',
        },
        {
          id: '5cfc35c3-06a0-493e-955a-d3854b0c5f98',
          device_id: '87d03a3e-5540-4dd1-85cc-be86578118c4',
          name: 'BRIDGE_TYPE',
          value: 'v6',
        },
      ],
      room: null,
      service: {
        id: 'a810b8db-6d04-4697-bed3-c4b72c996279',
        pod_id: null,
        name: 'test-service',
        selector: 'test-service',
        version: '0.1.0',
        enabled: true,
        has_message_feature: false,
      },
    },
  ]),
};

const gladys = {
  device: deviceManager,
  stateManager,
  event,
};

describe('MiLightService', () => {
  it('should set value', async () => {
    const miLightService = MiLightService(gladys, 'a810b8db-6d04-4697-bed3-c4b72c996279');
    await miLightService.device.init();
    miLightService.device.setValue(
      {
        external_id: 'mi-light-light:001b44113ab7:1',
        features: [
          {
            category: 'light',
            type: 'binary',
          },
        ],
      },
      {
        category: 'light',
        type: 'binary',
      },
      1,
    );
  });
});
