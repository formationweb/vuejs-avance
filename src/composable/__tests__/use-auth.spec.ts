import axios from "axios";
import {
  beforeEach,
  describe,
  vi,
  type Mock,
  test,
  expect,
  afterEach,
} from "vitest";
import { useAuth } from "../useAuth";
import { mount } from "@vue/test-utils";
import { AuthService } from "../../services/AuthService";
import { inject } from "vue";
import { createTestingPinia } from "@pinia/testing";

describe("useAuth Composable", () => {
  let mockService: {
    login: ReturnType<typeof vi.fn>;
  };
  let composable: any

  beforeEach(() => {
    mockService = {
      login: vi.fn(),
    };
    mount(
      {
        template: "none",
        setup() {
            composable = useAuth()
        }
      },
      {
        global: {
            provide: {
                authService: mockService,
            },
            plugins: [
              createTestingPinia({
                  createSpy: vi.fn,
                  stubActions: false
              })
            ]
        }
      }
    );
  });

  afterEach(() => {
    mockService.login.mockReset();
  });

  test("appelle login avec bons paramètres", async () => {
    const { email, password, submitAuth } = composable
    email.value = "ana@test.com";
    password.value = "azerty";

    await submitAuth();

    expect(mockService.login).toHaveBeenCalled();
  });
});
